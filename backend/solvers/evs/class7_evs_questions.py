"""
EVS Class 7 Question Generator (0-node DAG)
Deterministic question generation with seeded randomization.
Covers all chapters of CBSE Class 7 Environmental Science.
"""

import random
import json
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Tuple
from enum import Enum

class Chapter(Enum):
    NUTRITION_PLANTS = "nutrition_plants"
    NUTRITION_ANIMALS = "nutrition_animals"
    WEATHER_CLIMATE = "weather_climate"
    RESPIRATION = "respiration"
    TRANSPORTATION = "transportation"
    REPRODUCTION_PLANTS = "reproduction_plants"
    MOTION_TIME = "motion_time"
    ELECTRIC_CURRENT = "electric_current"
    LIGHT = "light"
    WATER_PRECIOUS = "water_precious"
    FORESTS_LIFELINE = "forests_lifeline"
    WASTEWATER_STORY = "wastewater_story"

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANKS = "fill_blanks"
    TRUE_FALSE = "true_false"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    MATCH_COLUMNS = "match_columns"

@dataclass
class Question:
    id: str
    chapter: str
    chapter_name: str
    type: str
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str = ""
    explanation: str = ""
    marks: int = 1
    difficulty: str = "medium"
    competency: str = "remembering"

    def to_dict(self) -> dict:
        return asdict(self)

@dataclass
class QuestionSet:
    chapter: str
    questions: List[Question]
    total_marks: int = 0
    seed: int = 42

    def __post_init__(self):
        self.total_marks = sum(q.marks for q in self.questions)

class EVSQuestionBank:
    """Centralized question bank for Class 7 EVS."""

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self.bank = self._build_bank()

    def _build_bank(self) -> Dict[str, List[Dict]]:
        """Build the complete question bank."""
        bank = {}

        # ==================== CHAPTER 1: NUTRITION IN PLANTS ====================
        bank[Chapter.NUTRITION_PLANTS.value] = [
            {
                "id": "NP001",
                "type": QuestionType.MCQ.value,
                "text": "Which pigment is present in green leaves that helps in photosynthesis?",
                "options": ["Chlorophyll", "Xanthophyll", "Carotene", "Anthocyanin"],
                "answer": "Chlorophyll",
                "explanation": "Chlorophyll is the green pigment in leaves that absorbs sunlight for photosynthesis.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NP002",
                "type": QuestionType.MCQ.value,
                "text": "The raw materials for photosynthesis are:",
                "options": [
                    "Carbon dioxide and water",
                    "Oxygen and glucose",
                    "Nitrogen and hydrogen",
                    "Protein and fats"
                ],
                "answer": "Carbon dioxide and water",
                "explanation": "Plants use CO2 from air and water from soil along with sunlight to make food.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "understanding"
            },
            {
                "id": "NP003",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "All green plants are autotrophs and can prepare their own food.",
                "answer": "True",
                "explanation": "Green plants contain chlorophyll and can synthesize their own food using sunlight.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NP004",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The process by which green plants make their own food using sunlight is called ________.",
                "answer": "photosynthesis",
                "explanation": "Photo = light, Synthesis = to make. Green plants make food using light energy.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NP005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "Write the chemical equation for photosynthesis.",
                "answer": "6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2",
                "explanation": "Six molecules of CO2 react with 6 molecules of water in presence of light to produce glucose and oxygen.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "NP006",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the following types of plants with their mode of nutrition:",
                "options": {
                    "Column A": ["Cuscuta", "Pitcher plant", "Mushroom", "Algae"],
                    "Column B": [
                        "Parasitic",
                        "Insectivorous",
                        "Saprophytic",
                        "Autotrophic"
                    ]
                },
                "answer": {"Cuscuta": "Parasitic", "Pitcher plant": "Insectivorous", "Mushroom": "Saprophytic", "Algae": "Autotrophic"},
                "explanation": "Cuscuta is a parasite, pitcher plant traps insects, mushrooms feed on dead matter, algae make their own food.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "NP007",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Explain the process of photosynthesis in detail. Why is it important for life on Earth?",
                "answer": "Photosynthesis is the process where green plants use chlorophyll to capture sunlight and convert CO2 and water into glucose and oxygen. It occurs mainly in leaves. It is important because: (1) Produces food for all organisms, (2) Releases oxygen needed for respiration, (3) Maintains CO2-O2 balance in atmosphere, (4) Provides raw materials for industry.",
                "explanation": "Full marks for mentioning process, chloroplast role, and four points of importance.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            },
            {
                "id": "NP008",
                "type": QuestionType.MCQ.value,
                "text": "Which organism is a saprophyte?",
                "options": ["Mushroom", "Pea plant", "Cuscuta", "Pitcher plant"],
                "answer": "Mushroom",
                "explanation": "Mushrooms are fungi that grow on dead organic matter and obtain nutrients from it.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NP009",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "Name the pores on leaf surfaces through which gas exchange takes place.",
                "answer": "Stomata (singular: stoma)",
                "explanation": "Stomata are tiny openings on leaf epidermis surrounded by guard cells.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NP010",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Heterotrophs can prepare their own food using sunlight.",
                "answer": "False",
                "explanation": "Heterotrophs depend on other organisms for food. Only autotrophs can make their own food.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "understanding"
            }
        ]

        # ==================== CHAPTER 2: NUTRITION IN ANIMALS ====================
        bank[Chapter.NUTRITION_ANIMALS.value] = [
            {
                "id": "NA001",
                "type": QuestionType.MCQ.value,
                "text": "The process of taking in food is called:",
                "options": ["Ingestion", "Digestion", "Absorption", "Egestion"],
                "answer": "Ingestion",
                "explanation": "Ingestion is the intake of food through the mouth.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NA002",
                "type": QuestionType.MCQ.value,
                "text": "Which enzyme is secreted by the salivary glands?",
                "options": ["Amylase", "Pepsin", "Trypsin", "Lipase"],
                "answer": "Amylase",
                "explanation": "Salivary amylase (ptyalin) breaks down starch into maltose in the mouth.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "remembering"
            },
            {
                "id": "NA003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The largest gland in the human body is the ________.",
                "answer": "liver",
                "explanation": "The liver weighs about 1.5 kg and produces bile for fat digestion.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NA004",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is the function of bile juice? Where is it produced?",
                "answer": "Bile juice emulsifies fats (breaks large fat globules into small droplets). It is produced by the liver and stored in the gallbladder.",
                "explanation": "Bile contains bile salts and bile pigments. It has no enzymes but aids fat digestion.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "NA005",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "The inner lining of the stomach secretes hydrochloric acid.",
                "answer": "True",
                "explanation": "HCl creates an acidic environment for pepsin to work and kills bacteria in food.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "NA006",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the parts of the digestive system with their functions:",
                "options": {
                    "Column A": ["Small intestine", "Large intestine", "Stomach", "Teeth"],
                    "Column B": [
                        "Complete digestion and absorption",
                        "Absorbs water, forms feces",
                        "Churns food with gastric juice",
                        "Mechanical breakdown of food"
                    ]
                },
                "answer": {
                    "Small intestine": "Complete digestion and absorption",
                    "Large intestine": "Absorbs water, forms feces",
                    "Stomach": "Churns food with gastric juice",
                    "Teeth": "Mechanical breakdown of food"
                },
                "explanation": "Each organ has a specialized role in the digestive process.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "NA007",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Describe the digestion of food in the small intestine. Mention the role of pancreas and intestinal juice.",
                "answer": "In the small intestine, pancreatic juice (from pancreas) and intestinal juice digest food completely. Pancreatic juice contains amylase, trypsin, and lipase. Intestinal juice contains carbohydrase, protease, and lipase enzymes. The inner surface has villi that absorb digested nutrients into blood. Bile from liver emulsifies fats. Complete digestion happens here and nutrients are absorbed.",
                "explanation": "Full marks for describing pancreatic enzymes, intestinal enzymes, bile role, and villi absorption.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            },
            {
                "id": "NA008",
                "type": QuestionType.MCQ.value,
                "text": "Where is the rumen found?",
                "options": ["Cow's stomach", "Human stomach", "Fish", "Bird"],
                "answer": "Cow's stomach",
                "explanation": "Cows are ruminants with a four-chambered stomach including rumen for cellulose digestion.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            }
        ]

        # ==================== CHAPTER 3: WEATHER, CLIMATE AND ADAPTATIONS ====================
        bank[Chapter.WEATHER_CLIMATE.value] = [
            {
                "id": "WC001",
                "type": QuestionType.MCQ.value,
                "text": "Which of the following is NOT a component of weather?",
                "options": ["Temperature", "Humidity", "Wind speed", "Population"],
                "answer": "Population",
                "explanation": "Weather components include temperature, humidity, rainfall, wind speed, etc. Population is not a weather component.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "WC002",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The average weather pattern of a place over a long period is called ________.",
                "answer": "climate",
                "explanation": "Climate refers to long-term weather patterns (30+ years) of a region.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "WC003",
                "type": QuestionType.MCQ.value,
                "text": "Which region receives the least rainfall in India?",
                "options": ["Rajasthan", "Kerala", "Assam", "West Bengal"],
                "answer": "Rajasthan",
                "explanation": "Rajasthan (Thar Desert) receives less than 25 cm rainfall annually.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "WC004",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Polar bears have a thick layer of fat to protect against cold.",
                "answer": "True",
                "explanation": "Polar bears have a 10-15 cm thick blubber layer for insulation in Arctic.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "understanding"
            },
            {
                "id": "WC005",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the animal with its adaptation:",
                "options": {
                    "Column A": ["Penguin", "Camel", "Frog", "Tropical bird"],
                    "Column B": [
                        "Hibernation in cold",
                        "Streamlined body, webbed feet",
                        "Humps to store fat",
                        "Brightly colored feathers"
                    ]
                },
                "answer": {
                    "Penguin": "Streamlined body, webbed feet",
                    "Camel": "Humps to store fat",
                    "Frog": "Hibernation in cold",
                    "Tropical bird": "Brightly colored feathers"
                },
                "explanation": "Each adaptation helps animals survive in their specific habitat.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "WC006",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "Define weather and climate. How are they different?",
                "answer": "Weather is the day-to-day condition of atmosphere (temperature, rain, wind, humidity). Climate is the average weather pattern of a place over many years. Weather changes daily; climate remains relatively constant over long periods.",
                "explanation": "Key difference: weather = short term, climate = long term average.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "WC007",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Describe the adaptations of animals living in polar and desert regions.",
                "answer": "Polar animals: (1) Thick fur/feathers/blubber for insulation, (2) White color for camouflage, (3) Large feet for walking on snow, (4) Fat storage. Desert animals: (1) Nocturnal habits to avoid heat, (2) Camels store water, (3) Reptiles have scales to reduce water loss, (4) Long limbs to stay away from hot ground.",
                "explanation": "Give at least 4 adaptations for each region with examples.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 4: RESPIRATION IN ORGANISMS ====================
        bank[Chapter.RESPIRATION.value] = [
            {
                "id": "RS001",
                "type": QuestionType.MCQ.value,
                "text": "The process of releasing energy from food is called:",
                "options": ["Respiration", "Photosynthesis", "Transpiration", "Excretion"],
                "answer": "Respiration",
                "explanation": "Respiration breaks down glucose to release energy (ATP) for cellular activities.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "RS002",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Anaerobic respiration occurs in the absence of oxygen.",
                "answer": "True",
                "explanation": "Anaerobic respiration happens without oxygen, e.g., in muscle cells during intense exercise.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "RS003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The breathing rate in an adult human at rest is about ________ breaths per minute.",
                "answer": "15-18",
                "explanation": "Normal breathing rate for adults is 15-18 breaths/minute; children breathe faster at 20-30.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "remembering"
            },
            {
                "id": "RS004",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is the difference between breathing and respiration?",
                "answer": "Breathing is the physical process of taking in oxygen and releasing CO2 through lungs. Respiration is the biochemical process where cells break down glucose to release energy. Breathing is part of the respiratory system; respiration occurs in all living cells.",
                "explanation": "Breathing = physical/mechanical. Respiration = biochemical/cellular.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "RS005",
                "type": QuestionType.MCQ.value,
                "text": "Which organism can respire through its skin?",
                "options": ["Earthworm", "Fish", "Bird", "Insect"],
                "answer": "Earthworm",
                "explanation": "Earthworms breathe through their moist skin (cutaneous respiration).",
                "marks": 1,
                "difficulty": "easy",
                "competency": "understanding"
            },
            {
                "id": "RS006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Explain how breathing mechanism works in humans. Draw and label the respiratory system.",
                "answer": "Breathing involves: (1) Inhalation - diaphragm contracts, moves down, ribs move up and out, air enters lungs. (2) Exhalation - diaphragm relaxes, moves up, ribs move down and in, air leaves. Respiratory system includes: nostrils, pharynx, larynx, trachea, bronchi, bronchioles, lungs, alveoli, diaphragm. Alveoli are thin-walled air sacs where gas exchange occurs.",
                "explanation": "Describe inhalation/exhalation mechanism. Label: nostrils, trachea, bronchi, lungs, diaphragm, alveoli.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 5: TRANSPORTATION IN ANIMALS AND PLANTS ====================
        bank[Chapter.TRANSPORTATION.value] = [
            {
                "id": "TP001",
                "type": QuestionType.MCQ.value,
                "text": "The fluid part of blood is called:",
                "options": ["Plasma", "RBC", "WBC", "Platelets"],
                "answer": "Plasma",
                "explanation": "Plasma is the straw-colored liquid that carries nutrients, hormones, and waste products.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "TP002",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "Blood vessels that carry blood away from the heart are called ________.",
                "answer": "arteries",
                "explanation": "Arteries carry oxygenated blood (except pulmonary artery). They have thick muscular walls.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "TP003",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Pulmonary artery carries oxygenated blood.",
                "answer": "False",
                "explanation": "Pulmonary artery carries deoxygenated blood to lungs. All other arteries carry oxygenated blood.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "TP004",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the blood component with its function:",
                "options": {
                    "Column A": ["Red Blood Cells", "White Blood Cells", "Platelets", "Plasma"],
                    "Column B": [
                        "Clotting of blood",
                        "Carries oxygen",
                        "Fights infection",
                        "Carries nutrients"
                    ]
                },
                "answer": {
                    "Red Blood Cells": "Carries oxygen",
                    "White Blood Cells": "Fights infection",
                    "Platelets": "Clotting of blood",
                    "Plasma": "Carries nutrients"
                },
                "explanation": "Each component has a specific role in blood functions.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "TP005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is the function of the heart? How many chambers does it have?",
                "answer": "The heart pumps blood throughout the body. It has 4 chambers: 2 atria (upper) and 2 ventricles (lower). Right side handles deoxygenated blood, left side handles oxygenated blood.",
                "explanation": "The heart acts as a double pump for pulmonary and systemic circulation.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "TP006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Describe the structure and function of the human heart. Explain double circulation.",
                "answer": "The human heart is a muscular organ with 4 chambers: Right atrium, Right ventricle, Left atrium, Left ventricle. Valves prevent backflow. Blood flow: Body → Vena cava → Right atrium → Right ventricle → Pulmonary artery → Lungs → Pulmonary vein → Left atrium → Left ventricle → Aorta → Body. Double circulation means blood passes through heart twice - pulmonary circuit (to lungs) and systemic circuit (to body).",
                "explanation": "Label 4 chambers. Explain both circuits of double circulation.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            },
            {
                "id": "TP007",
                "type": QuestionType.MCQ.value,
                "text": "Xylem in plants transports:",
                "options": ["Water and minerals", "Food", "Oxygen", "Hormones"],
                "answer": "Water and minerals",
                "explanation": "Xylem transports water and dissolved minerals from roots to other parts. Phloem transports food.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "TP008",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is transpiration? What is its significance?",
                "answer": "Transpiration is the loss of water as vapor from leaf stomata. Significance: (1) Creates suction for water movement, (2) Cools the plant, (3) Helps in mineral transport, (4) Maintains plant temperature.",
                "explanation": "Transpiration pull helps water rise in tall trees against gravity.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            }
        ]

        # ==================== CHAPTER 6: REPRODUCTION IN PLANTS ====================
        bank[Chapter.REPRODUCTION_PLANTS.value] = [
            {
                "id": "RP001",
                "type": QuestionType.MCQ.value,
                "text": "The male reproductive part of a flower is called:",
                "options": ["Stamen", "Pistil", "Sepal", "Petal"],
                "answer": "Stamen",
                "explanation": "Stamen consists of anther (produces pollen) and filament.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "RP002",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Pollination and fertilization are the same process.",
                "answer": "False",
                "explanation": "Pollination = transfer of pollen to stigma. Fertilization = fusion of male and female gametes.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "RP003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The transfer of pollen from anther to stigma is called ________.",
                "answer": "pollination",
                "explanation": "Pollination can be by insects (entomophily), wind (anemophily), or water (hydrophily).",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "RP004",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the plant part with its role in reproduction:",
                "options": {
                    "Column A": ["Anther", "Ovary", "Stigma", "Style"],
                    "Column B": [
                        "Pollen production",
                        "Produces ovules",
                        "Receives pollen",
                        "Connects stigma to ovary"
                    ]
                },
                "answer": {
                    "Anther": "Pollen production",
                    "Ovary": "Produces ovules",
                    "Stigma": "Receives pollen",
                    "Style": "Connects stigma to ovary"
                },
                "explanation": "The pistil/carpel consists of stigma, style, and ovary.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "RP005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "Name two modes of asexual reproduction in plants.",
                "answer": "(1) Vegetative propagation (runners, tubers, bulbs, cuttings), (2) Budding (yeast), (3) Fragmentation (Spirogyra), (4) Spore formation (ferns, moss).",
                "explanation": "Vegetative propagation is common - potato (tuber), mint (cutting), banana (suckers).",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "RP006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Describe the process of fertilization in flowers. What happens after fertilization?",
                "answer": "After pollination, pollen tube grows through style to ovary. Male gamete travels down tube and fuses with egg cell in ovule (fertilization). Zygote forms. After fertilization: (1) Ovary becomes fruit, (2) Ovules become seeds, (3) Petals, sepals, stamens fall off, (4) Seed contains embryo with stored food, (5) Seed can germinate into new plant.",
                "explanation": "Mention pollen tube growth, zygote formation, and post-fertilization changes.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 7: MOTION AND TIME ====================
        bank[Chapter.MOTION_TIME.value] = [
            {
                "id": "MT001",
                "type": QuestionType.MCQ.value,
                "text": "A car moving on a straight road is an example of:",
                "options": ["Rectilinear motion", "Circular motion", "Periodic motion", "Random motion"],
                "answer": "Rectilinear motion",
                "explanation": "Rectilinear motion = motion along a straight line.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "MT002",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The distance covered by an object in unit time is called ________.",
                "answer": "speed",
                "explanation": "Speed = Distance/Time. SI unit is m/s.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "MT003",
                "type": QuestionType.MCQ.value,
                "text": "Which of the following is a unit of time?",
                "options": ["Second", "Meter", "Kilogram", "Newton"],
                "answer": "Second",
                "explanation": "Second is the SI unit of time. Meter = length, Kilogram = mass, Newton = force.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "MT004",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "A car travels 240 km in 4 hours. What is its speed?",
                "answer": "Speed = Distance/Time = 240/4 = 60 km/h",
                "explanation": "Speed is calculated by dividing total distance by total time taken.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "MT005",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "A pendulum makes periodic motion.",
                "answer": "True",
                "explanation": "A pendulum oscillates back and forth at regular intervals, showing periodic motion.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "understanding"
            },
            {
                "id": "MT006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Differentiate between speed and velocity. A boy walks 3 km east, then 4 km north. Find his displacement.",
                "answer": "Speed = scalar (magnitude only). Velocity = vector (magnitude + direction). Displacement is the shortest distance from start to end. Using Pythagoras: Displacement = sqrt(3^2 + 4^2) = sqrt(25) = 5 km (northeast direction).",
                "explanation": "Displacement uses Pythagorean theorem for perpendicular directions. Speed is scalar, velocity is vector.",
                "marks": 3,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 8: ELECTRIC CURRENT AND ITS EFFECTS ====================
        bank[Chapter.ELECTRIC_CURRENT.value] = [
            {
                "id": "EC001",
                "type": QuestionType.MCQ.value,
                "text": "The SI unit of electric current is:",
                "options": ["Ampere", "Volt", "Ohm", "Watt"],
                "answer": "Ampere",
                "explanation": "Ampere (A) is the SI unit of electric current. Volt = potential difference, Ohm = resistance.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "EC002",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "A fuse wire is made of a material with high melting point.",
                "answer": "False",
                "explanation": "Fuse wire is made of low melting point material (alloy of lead and tin) so it melts on excess current.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "EC003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The device used to measure electric current in a circuit is called an ________.",
                "answer": "ammeter",
                "explanation": "Ammeter is connected in series to measure current.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "EC004",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the electrical effect with its application:",
                "options": {
                    "Column A": ["Heating effect", "Magnetic effect", "Chemical effect", "Light effect"],
                    "Column B": [
                        "Electric fuse",
                        "Electric bell",
                        "Electroplating",
                        "Electric bulb"
                    ]
                },
                "answer": {
                    "Heating effect": "Electric fuse",
                    "Magnetic effect": "Electric bell",
                    "Chemical effect": "Electroplating",
                    "Light effect": "Electric bulb"
                },
                "explanation": "Electric current produces heating, magnetic, chemical, and lighting effects.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "EC005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "Why do we use a fuse wire in electric circuits?",
                "answer": "A fuse wire protects electrical appliances from damage due to excessive current. It melts and breaks the circuit when current exceeds a safe limit, preventing fire hazards.",
                "explanation": "Fuse wire is connected in series with the live wire.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "EC006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Explain with a diagram how you will make an electromagnet. Mention its uses.",
                "answer": "To make an electromagnet: (1) Take a long iron nail, (2) Wind insulated copper wire around it (50+ turns), (3) Connect ends to a battery, (4) Place near iron pins - they get attracted. Uses: (1) Electric cranes, (2) Electric bells, (3) Motors, (4) MRI machines, (5) Loudspeakers.",
                "explanation": "Mention core (iron), coil (copper wire), and power source. More turns = stronger magnet.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 9: LIGHT ====================
        bank[Chapter.LIGHT.value] = [
            {
                "id": "LT001",
                "type": QuestionType.MCQ.value,
                "text": "Which of the following is NOT a property of light?",
                "options": ["Has mass", "Travels in straight lines", "Reflects from surfaces", "Refracts at boundaries"],
                "answer": "Has mass",
                "explanation": "Light is electromagnetic radiation - it has no mass, travels at 3×10^8 m/s.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "LT002",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "When light bounces back from a surface, it is called ________.",
                "answer": "reflection",
                "explanation": "Angle of incidence = Angle of reflection. Smooth surfaces give regular reflection.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "LT003",
                "type": QuestionType.MCQ.value,
                "text": "Which lens is used to correct myopia (nearsightedness)?",
                "options": ["Concave lens", "Convex lens", "Cylindrical lens", "Bifocal lens"],
                "answer": "Concave lens",
                "explanation": "Concave lens diverges light rays to focus on retina in myopic eyes.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "LT004",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "A concave mirror always forms a real image.",
                "answer": "False",
                "explanation": "Concave mirror forms virtual image when object is between pole and focus.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "LT005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is the difference between real and virtual images?",
                "answer": "Real image: Can be projected on screen, formed by actual convergence of rays. Virtual image: Cannot be projected, formed by apparent divergence, seen by looking into the mirror/lens.",
                "explanation": "Real images are inverted; virtual images are erect.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "LT006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Explain the formation of rainbow. What are its colors in order?",
                "answer": "Rainbow forms when white sunlight is dispersed by water droplets in atmosphere. Process: (1) Refraction - light enters droplet, (2) Dispersion - splits into colors (VIBGYOR), (3) Internal reflection inside droplet, (4) Refraction when exiting. Colors: Violet, Indigo, Blue, Green, Yellow, Orange, Red. Red has longest wavelength (outer arc), Violet shortest (inner arc).",
                "explanation": "Mnemonic: VIBGYOR or 'Roy G Biv'. Always mention dispersion and internal reflection.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 10: WATER: A PRECIOUS RESOURCE ====================
        bank[Chapter.WATER_PRECIOUS.value] = [
            {
                "id": "WP001",
                "type": QuestionType.MCQ.value,
                "text": "What percentage of Earth's water is available as freshwater?",
                "options": ["About 3%", "About 30%", "About 70%", "About 97%"],
                "answer": "About 3%",
                "explanation": "97% is saltwater, 3% freshwater. Of freshwater, only ~0.3% is accessible surface water.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "remembering"
            },
            {
                "id": "WP002",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Groundwater is a renewable resource.",
                "answer": "False",
                "explanation": "Groundwater replenishes very slowly (years to centuries) and is being depleted faster than recharge.",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "WP003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The process of seeping of water into the ground is called ________.",
                "answer": "infiltration",
                "explanation": "Infiltration recharges groundwater. It depends on soil type and vegetation cover.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "WP004",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the water source with its type:",
                "options": {
                    "Column A": ["Rainwater", "River water", "Groundwater", "Ocean water"],
                    "Column B": [
                        "Surface water",
                        "Surface water",
                        "Underground water",
                        "Saline water"
                    ]
                },
                "answer": {
                    "Rainwater": "Surface water",
                    "River water": "Surface water",
                    "Groundwater": "Underground water",
                    "Ocean water": "Saline water"
                },
                "explanation": "97% of Earth's water is in oceans. Freshwater sources are limited.",
                "marks": 2,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "WP005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "Name any three methods of water conservation.",
                "answer": "(1) Rainwater harvesting, (2) Drip irrigation, (3) Recycling water, (4) Fixing leaks, (5) Using water efficiently, (6) Afforestation to recharge groundwater.",
                "explanation": "Any 3 valid methods are correct.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "WP006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Why is water management important? Discuss the traditional methods of water conservation in India.",
                "answer": "Water management is important because: (1) Only 0.3% freshwater is accessible, (2) Population growth increases demand, (3) Groundwater depletion, (4) Drought-prone areas. Traditional methods: (1) Step wells (baolis), (2) Dams and reservoirs, (3) Check dams, (4) Kuhls (Himachal Pradesh channels), (5) Khadins (Rajasthan), (6) Tankas (underground tanks in Rajasthan).",
                "explanation": "Mention at least 3 traditional methods with states.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 11: FORESTS: OUR LIFELINE ====================
        bank[Chapter.FORESTS_LIFELINE.value] = [
            {
                "id": "FL001",
                "type": QuestionType.MCQ.value,
                "text": "Which is known as the 'lungs of the planet'?",
                "options": ["Amazon rainforest", "Sahara desert", "Pacific Ocean", "Himalayas"],
                "answer": "Amazon rainforest",
                "explanation": "Amazon rainforest produces ~20% of Earth's oxygen and absorbs massive CO2.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "FL002",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Deforestation can lead to soil erosion.",
                "answer": "True",
                "explanation": "Tree roots hold soil. Without trees, wind and rain wash away topsoil causing erosion.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "understanding"
            },
            {
                "id": "FL003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The gradual replacement of forest land by other land use is called ________.",
                "answer": "deforestation",
                "explanation": "Deforestation causes biodiversity loss, climate change, and soil erosion.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "FL004",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the forest product with its source:",
                "options": {
                    "Column A": ["Timber", "Paper", "Rubber", "Quinine"],
                    "Column B": [
                        "Tree trunk",
                        "Pulp from wood",
                        "Latex from rubber tree",
                        "Cinchona tree bark"
                    ]
                },
                "answer": {
                    "Timber": "Tree trunk",
                    "Paper": "Pulp from wood",
                    "Rubber": "Latex from rubber tree",
                    "Quinine": "Cinchona tree bark"
                },
                "explanation": "Forests provide timber, food, medicine, and raw materials.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "FL005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is the role of forests in maintaining the water cycle?",
                "answer": "(1) Transpiration adds moisture to air, (2) Roots absorb and store water, (3) Canopy intercepts rainfall reducing runoff, (4) Forests prevent floods by slowing water flow, (5) Recharge groundwater.",
                "explanation": "Forests are critical for the hydrological cycle.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "applying"
            },
            {
                "id": "FL006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Discuss the causes and consequences of deforestation. Suggest measures for forest conservation.",
                "answer": "Causes: (1) Agriculture expansion, (2) Urbanization, (3) Industrialization, (4) Mining, (5) Overgrazing, (6) Forest fires. Consequences: (1) Loss of biodiversity, (2) Soil erosion, (3) Climate change, (4) Floods and droughts, (5) Desertification. Conservation: (1) Afforestation, (2) Protected areas/national parks, (3) Community forestry, (4) Sustainable harvesting, (5) Laws and enforcement.",
                "explanation": "Give 3 causes, 3 consequences, 3 conservation measures.",
                "marks": 5,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        # ==================== CHAPTER 12: WASTEWATER STORY ====================
        bank[Chapter.WASTEWATER_STORY.value] = [
            {
                "id": "WS001",
                "type": QuestionType.MCQ.value,
                "text": "Wastewater is also called:",
                "options": ["Sewage", "Fresh water", "Rainwater", "Groundwater"],
                "answer": "Sewage",
                "explanation": "Sewage is wastewater from homes, industries, and institutions.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "WS002",
                "type": QuestionType.TRUE_FALSE.value,
                "text": "Wastewater treatment includes physical, chemical, and biological processes.",
                "answer": "True",
                "explanation": "Modern STPs use screening, sedimentation (physical), chlorination (chemical), and activated sludge (biological).",
                "marks": 1,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "WS003",
                "type": QuestionType.FILL_BLANKS.value,
                "text": "The first step in wastewater treatment is ________.",
                "answer": "screening",
                "explanation": "Screening removes large solids like plastic, cloth, and debris using bar screens.",
                "marks": 1,
                "difficulty": "easy",
                "competency": "remembering"
            },
            {
                "id": "WS004",
                "type": QuestionType.MATCH_COLUMNS.value,
                "text": "Match the pollutant with its source:",
                "options": {
                    "Column A": ["Detergents", "Pesticides", "Pathogens", "Heavy metals"],
                    "Column B": [
                        "Household cleaning",
                        "Agricultural runoff",
                        "Human waste",
                        "Industrial waste"
                    ]
                },
                "answer": {
                    "Detergents": "Household cleaning",
                    "Pesticides": "Agricultural runoff",
                    "Pathogens": "Human waste",
                    "Heavy metals": "Industrial waste"
                },
                "explanation": "Each pollutant has specific sources in wastewater.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "WS005",
                "type": QuestionType.SHORT_ANSWER.value,
                "text": "What is the difference between primary and secondary wastewater treatment?",
                "answer": "Primary treatment: Physical process - removes large solids through screening and settling. Secondary treatment: Biological process - uses bacteria to decompose organic matter. Aerobic bacteria consume dissolved pollutants.",
                "explanation": "Primary = physical removal. Secondary = biological degradation.",
                "marks": 2,
                "difficulty": "medium",
                "competency": "understanding"
            },
            {
                "id": "WS006",
                "type": QuestionType.LONG_ANSWER.value,
                "text": "Explain the steps in a wastewater treatment plant. Why is treated water still not fit for drinking?",
                "answer": "Steps: (1) Screening - removes large debris, (2) Grit removal - sand/pebbles settle, (3) Sedimentation - suspended solids settle as sludge, (4) Aeration - bacteria decompose organics, (5) Chlorination - kills pathogens, (6) Disinfection - final treatment. Treated water may still contain: (1) Dissolved salts, (2) Some chemicals, (3) Trace pharmaceuticals, (4) Microplastics, (5) Requires RO for drinking.",
                "explanation": "Mention all 6 steps. Treated water = clean enough for environment, not drinking.",
                "marks": 4,
                "difficulty": "hard",
                "competency": "analyzing"
            }
        ]

        return bank

    def get_questions(self, chapter: str, num_questions: int = 10,
                     difficulty: str = "all") -> List[Question]:
        """Get questions from a specific chapter with seeded randomization."""
        if chapter not in self.bank:
            raise ValueError(f"Chapter '{chapter}' not found. Available: {list(self.bank.keys())}")

        questions = self.bank[chapter]

        # Filter by difficulty
        if difficulty != "all":
            questions = [q for q in questions if q["difficulty"] == difficulty]

        # Shuffle with seeded RNG for deterministic output
        self.rng.shuffle(questions)

        return [
            Question(
                id=q["id"],
                chapter=chapter,
                chapter_name=Chapter(chapter).value.replace("_", " ").title(),
                type=q["type"],
                question_text=q["text"],
                options=q.get("options"),
                correct_answer=q["answer"],
                explanation=q["explanation"],
                marks=q["marks"],
                difficulty=q["difficulty"],
                competency=q["competency"]
            )
            for q in questions[:num_questions]
        ]

    def get_all_chapters(self) -> List[str]:
        """Return list of all available chapters."""
        return list(self.bank.keys())

    def get_chapter_info(self, chapter: str) -> Dict:
        """Get statistics for a chapter."""
        if chapter not in self.bank:
            return {}
        questions = self.bank[chapter]
        return {
            "total_questions": len(questions),
            "total_marks": sum(q["marks"] for q in questions),
            "types": list(set(q["type"] for q in questions)),
            "difficulties": list(set(q["difficulty"] for q in questions)),
            "competencies": list(set(q["competency"] for q in questions))
        }

    def generate_mixed_question_set(self, num_per_chapter: int = 3,
                                     seed: Optional[int] = None) -> List[Question]:
        """Generate questions from all chapters with seeded randomization."""
        if seed is not None:
            self.rng = random.Random(seed)

        all_questions = []
        for chapter in self.bank:
            questions = self.get_questions(chapter, num_per_chapter)
            all_questions.extend(questions)

        self.rng.shuffle(all_questions)
        return all_questions

    def export_to_json(self, filepath: str, chapter: Optional[str] = None):
        """Export questions to JSON file."""
        if chapter:
            data = self.bank.get(chapter, {})
        else:
            data = self.bank

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def get_questions_by_type(self, chapter: str, q_type: str,
                               num_questions: int = 5) -> List[Question]:
        """Get questions filtered by type."""
        questions = self.bank.get(chapter, [])
        filtered = [q for q in questions if q["type"] == q_type]
        self.rng.shuffle(filtered)
        return [
            Question(
                id=q["id"],
                chapter=chapter,
                chapter_name=Chapter(chapter).value.replace("_", " ").title(),
                type=q["type"],
                question_text=q["text"],
                options=q.get("options"),
                correct_answer=q["answer"],
                explanation=q["explanation"],
                marks=q["marks"],
                difficulty=q["difficulty"],
                competency=q["competency"]
            )
            for q in filtered[:num_questions]
        ]


class EVSQuizGenerator:
    """Generate formatted quizzes from question bank."""

    def __init__(self, seed: int = 42):
        self.bank = EVSQuestionBank(seed=seed)
        self.rng = random.Random(seed)

    def generate_chapter_quiz(self, chapter: str, num_questions: int = 10,
                               difficulty: str = "all") -> Dict:
        """Generate a complete quiz for a chapter."""
        questions = self.bank.get_questions(chapter, num_questions, difficulty)

        quiz = {
            "title": f"Class 7 EVS Quiz - {Chapter(chapter).value.replace('_', ' ').title()}",
            "chapter": chapter,
            "total_questions": len(questions),
            "total_marks": sum(q.marks for q in questions),
            "time_suggested": len(questions) * 2,  # 2 min per question
            "questions": []
        }

        for i, q in enumerate(questions, 1):
            q_dict = {
                "number": i,
                "id": q.id,
                "type": q.type,
                "difficulty": q.difficulty,
                "marks": q.marks,
                "question": q.question_text,
            }
            if q.options:
                q_dict["options"] = q.options
            quiz["questions"].append(q_dict)

        return quiz

    def generate_full_mock_test(self, seed: Optional[int] = None) -> Dict:
        """Generate a complete mock test with questions from all chapters."""
        if seed is not None:
            self.rng = random.Random(seed)

        test = {
            "title": "Class 7 EVS Full Mock Test",
            "total_marks": 0,
            "sections": []
        }

        for chapter in self.bank.get_all_chapters():
            chapter_name = Chapter(chapter).value.replace("_", " ").title()
            questions = self.bank.get_questions(chapter, 4)
            section = {
                "section_title": chapter_name,
                "questions": []
            }

            for i, q in enumerate(questions, 1):
                q_dict = {
                    "number": i,
                    "id": q.id,
                    "type": q.type,
                    "marks": q.marks,
                    "question": q.question_text,
                }
                if q.options:
                    q_dict["options"] = q.options
                section["questions"].append(q_dict)

            test["sections"].append(section)
            test["total_marks"] += sum(q.marks for q in questions)

        return test

    def generate_worksheet(self, chapter: str, mix: bool = True) -> str:
        """Generate a printable worksheet."""
        questions = self.bank.get_questions(chapter, 12)
        lines = [
            f"CLASS 7 EVS WORKSHEET",
            f"Chapter: {Chapter(chapter).value.replace('_', ' ').title()}",
            f"Total Marks: {sum(q.marks for q in questions)}",
            "=" * 60,
            ""
        ]

        current_type = None
        q_num = 1

        for q in questions:
            if q.type != current_type:
                current_type = q.type
                type_name = {
                    "mcq": "Multiple Choice Questions",
                    "fill_blanks": "Fill in the Blanks",
                    "true_false": "True or False",
                    "short_answer": "Short Answer Questions",
                    "long_answer": "Long Answer Questions",
                    "match_columns": "Match the Columns"
                }.get(q.type, q.type)

                lines.append(f"\n{type_name.upper()}")
                lines.append("-" * 40)

            lines.append(f"\n{q_num}. [{q.marks} mark(s)] {q.question_text}")

            if q.options:
                for opt in q.options:
                    lines.append(f"    ({chr(65 + q.options.index(opt))}) {opt}")

            q_num += 1

        lines.append("\n" + "=" * 60)
        lines.append("END OF WORKSHEET")

        return "\n".join(lines)

    def get_answer_key(self, chapter: str, num_questions: int = 10) -> str:
        """Generate answer key for a chapter quiz."""
        questions = self.bank.get_questions(chapter, num_questions)
        lines = [
            f"ANSWER KEY - {Chapter(chapter).value.replace('_', ' ').title()}",
            "=" * 60,
            ""
        ]

        for i, q in enumerate(questions, 1):
            lines.append(f"Q{i}. {q.id}")
            lines.append(f"   Answer: {q.correct_answer}")
            lines.append(f"   Explanation: {q.explanation}")
            lines.append("")

        return "\n".join(lines)


# Convenience function for quick question generation
def generate_questions(chapter: str, num: int = 10, seed: int = 42) -> List[Question]:
    """Quick function to generate questions."""
    bank = EVSQuestionBank(seed=seed)
    return bank.get_questions(chapter, num)


if __name__ == "__main__":
    # Demo usage
    gen = EVSQuizGenerator(seed=42)

    print("Available chapters:")
    for ch in gen.bank.get_all_chapters():
        info = gen.bank.get_chapter_info(ch)
        print(f"  - {ch}: {info['total_questions']} questions, {info['total_marks']} marks")

    print("\n" + "=" * 60)
    print("Sample Quiz - Nutrition in Plants")
    print("=" * 60)
    quiz = gen.generate_chapter_quiz("nutrition_plants", 5)
    for q in quiz["questions"]:
        print(f"\n{q['number']}. [{q['marks']}m] {q['question']}")
        if "options" in q:
            for opt in q["options"]:
                print(f"   ({chr(65 + q['options'].index(opt))}) {opt}")

    print("\n" + "=" * 60)
    print("Answer Key")
    print("=" * 60)
    print(gen.get_answer_key("nutrition_plants", 5))