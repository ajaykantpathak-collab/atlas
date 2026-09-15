import random
import math
import hashlib
import json
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple, Any
from enum import Enum

class Topic(Enum):
    ENVIRONMENT = "environment"
    ECOSYSTEM = "ecosystem"
    FOOD_CHAIN = "food_chain"
    FOREST = "forest"
    WATER = "water"
    AIR = "air"
    RESOURCES = "resources"
    WEATHER = "weather"
    ADAPTATION = "adaptation"
    SOIL = "soil"
    WATER_CONSERVATION = "water_conservation"
    WASTE = "waste"
    BIOGAS = "biogas"

class Level(Enum):
    COMPETENCY = "competency"
    STANDARD = "standard"

@dataclass
class Question:
    topic: str
    level: str
    question_text: str
    options: List[str]
    correct_answer: int
    explanation: str
    steps: List[str]
    indian_context: str
    difficulty: str

    def to_dict(self) -> dict:
        return {
            "topic": self.topic,
            "level": self.level,
            "question": self.question_text,
            "options": self.options,
            "correct_answer": self.correct_answer,
            "explanation": self.explanation,
            "steps": self.steps,
            "indian_context": self.indian_context,
            "difficulty": self.difficulty
        }

@dataclass
class SolverResult:
    question: Question
    user_answer: Optional[int]
    is_correct: bool
    feedback: str
    score: float

    def to_dict(self) -> dict:
        return {
            "question": self.question.to_dict(),
            "user_answer": self.user_answer,
            "is_correct": self.is_correct,
            "feedback": self.feedback,
            "score": self.score
        }

class DeterministicHash:
    @staticmethod
    def hash_to_int(data: str, bound: int) -> int:
        h = hashlib.sha256(data.encode()).hexdigest()
        return int(h[:12], 16) % bound


class EVSClass7Solver:
    """
    Deterministic solver for CBSE Class 7 EVS ('Our Environment' - NCERT).

    All random choices are seeded and hashed for full determinism.
    50% competency level (recall/recognition) + 50% standard level (application/analysis).
    Indian context embedded in every question.
    """

    TOPICS = [
        Topic.ENVIRONMENT, Topic.ECOSYSTEM, Topic.FOOD_CHAIN,
        Topic.FOREST, Topic.WATER, Topic.AIR, Topic.RESOURCES,
        Topic.WEATHER, Topic.ADAPTATION, Topic.SOIL,
        Topic.WATER_CONSERVATION, Topic.WASTE, Topic.BIOGAS
    ]

    def __init__(self, seed: int = 42):
        self.seed = seed
        self.rng = random.Random(seed)
        self._question_bank: Dict[str, List[Dict]] = self._build_bank()
        self._question_sequence: List[str] = []
        self._generate_question_sequence()

    # ─────────────────────────────────────────────
    #   Knowledge base
    # ─────────────────────────────────────────────
    @staticmethod
    def _kb() -> Dict[str, Any]:
        return {
            "environment_components": [
                {"id": "natural",     "label": "Natural",
                 "desc": "Exists without human intervention (mountains, rivers, forests)",
                 "examples": ["Himalayas", "Ganga", "Western Ghats"]},
                {"id": "human_made",  "label": "Human-made",
                 "desc": "Created by humans (buildings, roads, dams)",
                 "examples": ["Roads", "Dams", "Buildings"]},
                {"id": "human",       "label": "Human",
                 "desc": "People and their communities",
                 "examples": ["Villages", "Cities", "Communities"]},
            ],
            "ecosystem_definition": {
                "term": "Ecosystem",
                "definition": "A system where living organisms interact with each other and with physical surroundings",
                "key_features": [
                    "Biotic components (living: plants, animals, microbes)",
                    "Abiotic components (non-living: sunlight, water, soil, air)",
                    "Energy flow through food chains",
                    "Nutrient cycling"
                ]
            },
            "food_chains": {
                "forest": {
                    "chain": ["Grass → Deer → Tiger", "Plants → Rabbit → Fox"],
                    "top_predator": "Tiger",
                    "producer": "Plants / Grass",
                    "location": "Corbett National Park, Uttarakhand"
                },
                "pond": {
                    "chain": ["Algae → Fish → Kingfisher", "Plants → Snail → Fish"],
                    "top_predator": "Kingfisher / Heron",
                    "producer": "Algae / Aquatic Plants",
                    "location": "Keoladeo National Park, Bharatpur (Rajasthan)"
                },
                "farm": {
                    "chain": ["Wheat → Rat → Snake", "Rice → Grasshopper → Frog"],
                    "top_predator": "Snake / Eagle",
                    "producer": "Wheat / Rice",
                    "location": "Punjab agricultural fields"
                }
            },
            "forest_types": [
                {"type": "Tropical Evergreen", "rainfall": ">200 cm",
                 "region": "Western Ghats, Andaman & Nicobar",
                 "trees": "Mahogany, Rosewood, Ebony", "animals": "Elephant, Lion-tailed Macaque"},
                {"type": "Tropical Deciduous",  "rainfall": "100–200 cm",
                 "region": "Central India, Gangetic plains",
                 "trees": "Teak, Sal, Sheesham",         "animals": "Tiger, Deer, Peacock"},
                {"type": "Tropical Thorn",       "rainfall": "<50 cm",
                 "region": "Rajasthan, Gujarat, Haryana",
                 "trees": "Babul, Neem, Kikar",           "animals": "Fox, Camel, Lizards"},
                {"type": "Montane / Himalayan",  "rainfall": "150–250 cm",
                 "region": "Himachal Pradesh, Uttarakhand, Sikkim",
                 "trees": "Deodar, Pine, Fir, Spruce",    "animals": "Leopard, Musk Deer, Monal"},
                {"type": "Mangrove / Tidal",     "rainfall": "High humidity",
                 "region": "Sundarbans (West Bengal)",
                 "trees": "Sundari, Garjan, Gengwa",      "animals": "Royal Bengal Tiger, Crocodile"},
            ],
            "water_sources": [
                {"source": "Groundwater",     "recharge": "Rainwater seepage",       "crisis": "Depleting fast in Punjab, Rajasthan"},
                {"source": "River water",     "rivers": "Ganga, Yamuna, Brahmaputra","crisis": "Pollution, damming"},
                {"source": "Rainwater",       "harvesting": "Rooftop, check dams",  "crisis": "Erratic monsoons due to climate change"},
                {"source": "Lakes & Ponds",   "examples": "Dal Lake, Loktak Lake",  "crisis": "Encroachment, eutrophication"},
                {"source": "Sea water",       "use": "Desalination",                "crisis": "High cost of desalination"},
            ],
            "water_states": [
                {"state": "Solid (Ice)",   "temp": "Below 0°C", "example": "Himalayan glaciers"},
                {"state": "Liquid (Water)","temp": "0–100°C",   "example": "Rivers, lakes"},
                {"state": "Gas (Vapour)",  "temp": "Above 100°C","example": "Water vapour in atmosphere"},
            ],
            "water_conservation": [
                {"method": "Rainwater Harvesting",   "desc": "Collecting rain in tanks / underground",
                 "example": "Tamil Nadu mandate for all buildings"},
                {"method": "Watershed Management",   "desc": "Managing entire drainage basin",
                 "example": "Haryali programme by Nehru Yuva Kendra"},
                {"method": "Drip Irrigation",        "desc": "Water delivered drop-by-drop to roots",
                 "example": "Rajasthan (Mewar region)"},
                {"method": "Bamboo Drip Irrigation", "desc": "Bamboo pipes channel water",
                 "example": "Meghalaya (Khasi hills)"},
                {"method": "Khadin / Johad",          "desc": "Earthen check dams",
                 "example": "Rajasthan (Tarun Bharat Sangh, Rajendra Singh)"},
                {"method": "Check Dam",               "desc": "Small barriers across streams",
                 "example": "Maharashtra (Ralegan Siddhi - Anna Hazare)"},
            ],
            "air_composition": [
                {"gas": "Nitrogen (N₂)",  "pct": 78, "note": "Not used by animals directly"},
                {"gas": "Oxygen (O₂)",    "pct": 21, "note": "Essential for respiration"},
                {"gas": "Carbon Dioxide", "pct": 0.04,"note": "Used by plants for photosynthesis"},
                {"gas": "Other gases",    "pct": 0.96,"note": "Argon, neon, helium, etc."},
            ],
            "air_pollutants": [
                {"pollutant": "Carbon Monoxide (CO)",    "source": "Vehicle exhaust, incomplete combustion"},
                {"pollutant": "Sulphur Dioxide (SO₂)",   "source": "Burning fossil fuels, thermal power plants"},
                {"pollutant": "Nitrogen Dioxide (NO₂)",  "source": "Vehicle exhaust, power plants"},
                {"pollutant": "Particulate Matter (PM2.5/PM10)",
                 "source": "Construction dust, burning of crop residue (Punjab/Haryana stubble)"},
                {"pollutant": "Smoke",                   "source": "Burning wood, crop stubble"},
            ],
            "resources": {
                "renewable": ["Solar energy", "Wind energy", "Biomass", "Hydropower",
                               "Forests (if managed sustainably)"],
                "non_renewable": ["Coal", "Petroleum", "Natural gas",
                                   "Minerals (iron, copper, bauxite)"],
            },
            "weather_elements": ["Temperature", "Humidity", "Wind speed",
                                  "Rainfall", "Atmospheric pressure"],
            "adaptations": {
                "polar": {
                    "animal": "Polar Bear",
                    "adaptations": [
                        "Thick layer of blubber (fat) for insulation",
                        "White fur for camouflage in snow",
                        "Small ears to minimise heat loss",
                        "Paws with fur for walking on ice"
                    ],
                    "region": "Arctic region"
                },
                "desert": {
                    "animal": "Camel (Camelus dromedarius)",
                    "adaptations": [
                        "Long legs to keep body away from hot sand",
                        "Hump stores fat, not water (metabolised into water)",
                        "Large padded feet prevent sinking in sand",
                        "Can drink up to 200 litres at once",
                        "Minimal sweating, concentrated urine"
                    ],
                    "region": "Rajasthan Desert (Thar)"
                },
                "tropical_rainforest": {
                    "animal": "Red-eyed Frog",
                    "adaptations": [
                        "Sticky pads on feet for climbing trees",
                        "Bright red eyes as defence (startle predators)",
                        "Nocturnal activity to avoid daytime heat",
                        "Moist skin for breathing through skin"
                    ],
                    "region": "Western Ghats"
                },
                "aquatic": {
                    "animal": "Fish",
                    "adaptations": [
                        "Streamlined body for swimming",
                        "Gills for extracting oxygen from water",
                        "Scales to protect body",
                        "Swim bladder for buoyancy"
                    ],
                    "region": "Rivers, lakes, oceans"
                },
            },
            "soil": {
                "types": [
                    {"type": "Alluvial",  "region": "Indo-Gangetic plains (Punjab, UP, Bihar)",
                     "fertility": "High",  "crops": "Rice, wheat, sugarcane, jute",
                     "texture": "Fine and porous"},
                    {"type": "Black (Regur)",
                     "region": "Deccan Plateau (Maharashtra, MP)",
                     "fertility": "High",  "crops": "Cotton, groundnut, wheat",
                     "texture": "Clayey, retains moisture"},
                    {"type": "Red",       "region": "Tamil Nadu, Karnataka, Andhra Pradesh",
                     "fertility": "Medium","crops": "Millets, pulses, groundnut",
                     "texture": "Sandy and porous"},
                    {"type": "Laterite",  "region": "Kerala, Karnataka, Odisha",
                     "fertility": "Low",   "crops": "Cashew, tapioca, rubber",
                     "texture": "Rich in iron oxide, hard when dry"},
                    {"type": "Arid/Desert","region": "Rajasthan, Gujarat",
                     "fertility": "Low",   "crops": "Millets, pulses",
                     "texture": "Sandy, low humus"},
                ],
                "erosion_causes": [
                    "Deforestation (removal of tree cover)",
                    "Overgrazing by cattle",
                    "Unsustainable agriculture (no crop rotation)",
                    "Heavy rainfall / Floods",
                    "Wind erosion in arid regions"
                ],
                "conservation": [
                    "Afforestation (planting new forests)",
                    "Terracing (on hill slopes, e.g., Himachal Pradesh)",
                    "Contour ploughing (ploughing along contour lines)",
                    "Plantation of shelter belts (rows of trees to break wind)",
                    "Preventing overgrazing",
                ]
            },
            "waste_categories": {
                "biodegradable": {
                    "definition": "Can be broken down by living organisms",
                    "examples": ["Fruit peels", "Vegetable scraps", "Paper", "Cotton cloth"],
                    "disposal": "Composting / Vermicomposting",
                    "time_to_decompose": "2 weeks to 6 months"
                },
                "non_biodegradable": {
                    "definition": "Cannot be broken down easily by living organisms",
                    "examples": ["Plastic bags", "Glass bottles", "Aluminium cans", "E-waste"],
                    "disposal": "Recycling / Landfill",
                    "time_to_decompose": "Hundreds to thousands of years"
                }
            },
            "biogas": {
                "raw_material": "Cow dung (gobar), kitchen waste, crop residue",
                "process": "Anaerobic digestion by bacteria (methanogens)",
                "products": ["Biogas (methane ~55-65%)", "Slurry (organic fertilizer)"],
                "energy": "1 kg dung ≈ 0.03 m³ biogas ≈ burns for ~10 minutes",
                "benefits": [
                    "Provides clean cooking fuel (reduces firewood use)",
                    "Organic slurry improves soil fertility",
                    "Reduces deforestation",
                    "Reduces respiratory disease from smoke",
                    "Government support under National Biogas Programme"
                ],
                "design": "Dome-shaped digester (underground)",
            }
        }

    # ─────────────────────────────────────────────
    #   Question-bank builder
    # ─────────────────────────────────────────────
    def _build_bank(self) -> Dict[str, List[Dict]]:
        kb = self._kb()
        bank: Dict[str, List[Dict]] = {}

        # ── ENVIRONMENT ──
        bank["environment"] = [
            {
                "id": "env_01",
                "question": "Which of the following is a NATURAL component of the environment?",
                "options": ["Building", "Road", "Mountain (Himalayas)", "Bridge"],
                "correct": 2,
                "steps": [
                    "Step 1: Recall the three main components of the environment — Natural, Human-made, and Human.",
                    "Step 2: Natural components exist without human intervention.",
                    "Step 3: Evaluate each option:",
                    "  • Building → Human-made (constructed by people)",
                    "  • Road → Human-made (infrastructure)",
                    "  • Mountain (Himalayas) → Natural (formed by geological processes)",
                    "  • Bridge → Human-made (engineered structure)",
                    "Step 4: Therefore, Himalayas is the natural component."
                ],
                "explanation": "The Himalayas are a natural component of the environment — they exist independently of human activity and were formed by the collision of tectonic plates.",
                "indian_context": "The Himalayas are called the 'abode of snow' and form the northern boundary of India, influencing our monsoon climate and protecting the country from cold Central Asian winds."
            },
            {
                "id": "env_02",
                "question": "The Taj Mahal (Agra) is an example of which component of the environment?",
                "options": ["Natural component", "Human-made component", "Human component", "Both A and B"],
                "correct": 1,
                "steps": [
                    "Step 1: The environment has three components — Natural, Human-made, and Human.",
                    "Step 2: The Taj Mahal was built by Mughal Emperor Shah Jahan in 1653.",
                    "Step 3: It is an architectural marvel made by human effort, not a natural formation.",
                    "Step 4: Therefore, it is a Human-made component."
                ],
                "explanation": "The Taj Mahal, built between 1632–1653, is a Human-made component of the environment.",
                "indian_context": "The Taj Mahal, built by Shah Jahan for Mumtaz Mahal, is a UNESCO World Heritage Site and one of the New Seven Wonders of the World. It is now threatened by air pollution from nearby industries and the Mathura oil refinery."
            },
            {
                "id": "env_03",
                "question": "Which of the following does NOT belong to the natural environment?",
                "options": ["Ganga River", "Western Ghats", "Nuclear Power Plant", "Forest"],
                "correct": 2,
                "steps": [
                    "Step 1: Identify natural vs. human-made components.",
                    "Step 2: Ganga → Natural river, Western Ghats → Natural mountain range, Forest → Natural ecosystem.",
                    "Step 3: Nuclear Power Plant → built by humans to generate electricity.",
                    "Step 4: Correct answer is Nuclear Power Plant."
                ],
                "explanation": "Nuclear Power Plants are human-made. Ganga, Western Ghats, and forests are all natural components.",
                "indian_context": "India has 7 operational Nuclear Power Plants including Tarapur (Maharashtra), Kudankulam (Tamil Nadu), and Narora (UP), contributing about 3% of India's electricity."
            },
            {
                "id": "env_04",
                "question": "The 'abode of snow' referring to the Himalayas is which type of environment component?",
                "options": ["Human-made", "Natural", "Human community", "Economic"],
                "correct": 1,
                "steps": [
                    "Step 1: 'Abode of snow' = Himalayas (Sanskrit: Him = snow, Alaya = abode).",
                    "Step 2: Himalayas formed naturally ~50 million years ago by Indian-Eurasian plate collision.",
                    "Step 3: They are not created by humans.",
                    "Step 4: They are a natural component of the environment."
                ],
                "explanation": "The Himalayas are a natural environment component formed by tectonic activity.",
                "indian_context": "The Himalayas span 2,400 km across India, Nepal, Bhutan, Pakistan, and China. They block cold Central Asian winds and force monsoon clouds to shed rain over India."
            },
        ]

        # ── ECOSYSTEM ──
        bank["ecosystem"] = [
            {
                "id": "eco_01",
                "question": "An ecosystem consists of which two types of components?",
                "options": [
                    "Plants and Animals",
                    "Biotic and Abiotic",
                    "Producers and Consumers",
                    "Land and Water"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the definition of ecosystem: a system of interaction between living organisms and physical surroundings.",
                    "Step 2: The two broad categories are:",
                    "  • Biotic (living): plants, animals, microbes",
                    "  • Abiotic (non-living): sunlight, water, soil, air, temperature",
                    "Step 3: While producers and consumers are biotic sub-categories, the main division is biotic and abiotic.",
                    "Step 4: Answer = Biotic and Abiotic."
                ],
                "explanation": "An ecosystem has Biotic components (living organisms) and Abiotic components (non-living physical factors like sunlight, water, soil).",
                "indian_context": "India has diverse ecosystems — from the Sundarbans mangrove forest (UNESCO site) to the Thar desert to the Western Ghats biodiversity hotspot (UNESCO World Heritage Site)."
            },
            {
                "id": "eco_02",
                "question": "In an ecosystem, which component provides energy for all other organisms?",
                "options": ["Consumers", "Decomposers", "Sun (Sunlight)", "Soil"],
                "correct": 2,
                "steps": [
                    "Step 1: Identify the primary source of energy on Earth.",
                    "Step 2: The Sun provides light energy that plants capture through photosynthesis.",
                    "Step 3: All food chains begin with the Sun's energy.",
                    "Step 4: Correct answer: Sun (Sunlight)."
                ],
                "explanation": "The Sun is the primary source of energy. Plants capture solar energy via photosynthesis, forming the base of every food chain.",
                "indian_context": "India receives abundant solar energy — about 5,000 trillion kWh annually. The National Solar Mission aims for 100 GW of solar capacity by 2030."
            },
            {
                "id": "eco_03",
                "question": "Which organisms in an ecosystem are called 'decomposers'?",
                "options": ["Plants", "Animals", "Bacteria and Fungi", "Algae"],
                "correct": 2,
                "steps": [
                    "Step 1: Decomposers break down dead organic matter into simple substances.",
                    "Step 2: Bacteria (microorganisms) and Fungi (mushrooms, mould) break down dead plants and animals.",
                    "Step 3: They recycle nutrients back to the soil for plants.",
                    "Step 4: Answer = Bacteria and Fungi."
                ],
                "explanation": "Bacteria and fungi are decomposers that break down dead organic matter, returning nutrients to the soil.",
                "indian_context": "Earthworms in Indian farms act as natural decomposers. The Vermicomposting technique (using earthworms) is widely promoted by the Indian government to convert agricultural waste into organic fertiliser."
            },
        ]

        # ── FOOD CHAIN ──
        bank["food_chain"] = [
            {
                "id": "fc_01",
                "question": "In the food chain: Grass → Grasshopper → Frog → Snake → Eagle,\nwho is the PRODUCER?",
                "options": ["Grasshopper", "Frog", "Grass", "Eagle"],
                "correct": 2,
                "steps": [
                    "Step 1: A producer is an organism that makes its own food through photosynthesis.",
                    "Step 2: In a food chain, the producer is always at the first position (bottom).",
                    "Step 3: Grass is a green plant that makes food using sunlight, CO₂, and water.",
                    "Step 4: Grasshopper (herbivore) eats Grass → Frog (carnivore) eats Grasshopper, etc.",
                    "Step 5: Answer = Grass."
                ],
                "explanation": "Grass is the producer — it is a green plant that synthesises its own food through photosynthesis using sunlight, carbon dioxide, and water.",
                "indian_context": "Grasslands in India (e.g., Shivpuri in MP, Kaziranga in Assam) support such food chains. Grasslands cover about 18% of India's geographical area."
            },
            {
                "id": "fc_02",
                "question": "In any food chain, the number of organisms at each level typically:\n(Assuming 10% energy transfer)",
                "options": [
                    "Increases from producers to top consumers",
                    "Decreases from producers to top consumers",
                    "Remains the same at all levels",
                    "Fluctuates randomly"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the 10% energy transfer rule — only ~10% of energy is passed to the next trophic level.",
                    "Step 2: If grass (producer) has 10,000 kcal, grasshopper gets 1,000 kcal, frog gets 100 kcal.",
                    "Step 3: Less energy at higher levels means fewer organisms can be supported.",
                    "Step 4: Therefore, the number of organisms decreases from producers to top consumers.",
                    "Step 5: This forms a PYRAMID shape — Energy Pyramid."
                ],
                "explanation": "Due to the 10% energy transfer law, fewer organisms can be supported at higher trophic levels. This results in fewer organisms at the top of the food chain.",
                "indian_context": "Tigers (top predator) need large forest areas (~10–25 sq km per tiger) because so much energy is lost at each level. India's Project Tiger (launched 1973) protects this apex predator."
            },
            {
                "id": "fc_03",
                "question": "Which of these organisms is a SECONDARY consumer in a pond food chain:\nAlgae → Tadpole → Fish → Kingfisher?",
                "options": ["Algae", "Tadpole", "Fish", "Kingfisher"],
                "correct": 2,
                "steps": [
                    "Step 1: Trophic levels:",
                    "  • Producer (1st): Algae — makes its own food",
                    "  • Primary Consumer (2nd): Tadpole — eats algae (herbivore)",
                    "  • Secondary Consumer (3rd): Fish — eats tadpole (carnivore)",
                    "  • Tertiary Consumer (4th): Kingfisher — eats fish (top carnivore)",
                    "Step 2: Secondary consumer = the carnivore at the 3rd position.",
                    "Step 3: Answer = Fish."
                ],
                "explanation": "Fish is the secondary consumer — it eats the primary consumer (tadpole) which feeds on the producer (algae).",
                "indian_context": "Keoladeo National Park (Bharatpur, Rajasthan) is a famous wetland supporting kingfishers and many fish-eating birds. It is a UNESCO World Heritage Site."
            },
            {
                "id": "fc_04",
                "question": "In a food web, compared to a food chain, organisms have:",
                "options": [
                    "Fewer food options",
                    "More food options",
                    "Exactly one food source",
                    "No food source"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: A food chain is a single linear sequence: A → B → C → D.",
                    "Step 2: A food web is an interconnected network of multiple food chains.",
                    "Step 3: In a web, one organism may eat multiple types of food and be eaten by multiple predators.",
                    "Step 4: Therefore, organisms in a food web have MORE food options.",
                    "Step 5: Example: A frog eats insects, spiders, AND small fish (web), not just one."
                ],
                "explanation": "A food web is an interconnected set of food chains. Organisms in a web have multiple food sources and multiple predators, making the ecosystem more stable.",
                "indian_context": "In the Sundarbans mangrove ecosystem, the Royal Bengal Tiger eats deer, wild boar, fish, AND crabs — demonstrating a complex food web."
            },
        ]

        # ── FOREST ──
        bank["forest"] = [
            {
                "id": "for_01",
                "question": "The Tropical Evergreen Forest found in the Western Ghats\nreceives more than how much annual rainfall?",
                "options": ["100 cm", "150 cm", "200 cm", "50 cm"],
                "correct": 2,
                "steps": [
                    "Step 1: Recall the four main forest types of India and their rainfall requirements.",
                    "Step 2: Tropical Evergreen forests receive the highest rainfall — more than 200 cm annually.",
                    "Step 3: Tropical Deciduous = 100–200 cm, Thorn = <50 cm, Montane = 150–250 cm.",
                    "Step 4: Western Ghats is a Tropical Evergreen region.",
                    "Step 5: Answer = 200 cm."
                ],
                "explanation": "Tropical Evergreen forests receive more than 200 cm of rainfall annually. They are found in the Western Ghats, Andaman & Nicobar Islands, and the northeastern states.",
                "indian_context": "The Western Ghats are one of the world's 8 'hottest hotspots' of biological diversity, with over 5,000 flowering plant species. Places like Agumbe (Karnataka) receive 7,000–11,000 mm rainfall annually."
            },
            {
                "id": "for_02",
                "question": "Which forest type is found in the Sundarbans of West Bengal?",
                "options": ["Tropical Evergreen", "Tropical Deciduous", "Tropical Thorn", "Mangrove (Tidal)"],
                "correct": 3,
                "steps": [
                    "Step 1: Sundarbans is a delta region where the Ganga and Brahmaputra rivers meet the Bay of Bengal.",
                    "Step 2: It is characterised by tidal water and salt-tolerant trees.",
                    "Step 3: Mangrove forests grow in coastal inter-tidal zones.",
                    "Step 4: Sundarbans is the largest mangrove forest in the world.",
                    "Step 5: Answer = Mangrove (Tidal) Forest."
                ],
                "explanation": "The Sundarbans in West Bengal host the world's largest mangrove forest. The Sundari tree (Heritiera fomes) gives the forest its name.",
                "indian_context": "The Sundarbans is a UNESCO World Heritage Site and home to the Royal Bengal Tiger (the only tiger adapted to a mangrove/swamp habitat) and the Bengal Tiger. It covers ~10,000 sq km across India and Bangladesh."
            },
            {
                "id": "for_03",
                "question": "Teak (Sagwan) and Sal trees are characteristic of which Indian forest type?",
                "options": ["Tropical Evergreen", "Tropical Deciduous", "Tropical Thorn", "Montane"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall trees characteristic of each forest type.",
                    "Step 2: Teak and Sal are important commercial timber trees.",
                    "Step 3: They shed leaves in dry season → Deciduous.",
                    "Step 4: Deciduous forests receive 100–200 cm rain.",
                    "Step 5: Answer = Tropical Deciduous."
                ],
                "explanation": "Teak and Sal trees are characteristic of Tropical Deciduous forests, which shed their leaves during the dry season to conserve water.",
                "indian_context": "Teak (Tectona grandis) is called 'Sagwan' and is India's most important commercial timber. Central Indian states (MP, Chhattisgarh, Maharashtra) have the largest teak forests. The Indian Forest Act regulates teak harvesting."
            },
            {
                "id": "for_04",
                "question": "The 'Chipko Movement' (1973) of Uttarakhand was primarily a movement for:",
                "options": ["Wildlife conservation", "Forest conservation", "Water conservation", "Soil conservation"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the Chipko Movement of 1973.",
                    "Step 2: Villagers (mostly women) in Reni village, Chamoli district, Uttarakhand hugged trees to prevent loggers from cutting them.",
                    "Step 3: The word 'Chipko' means 'to hug' or 'stick to' in Hindi.",
                    "Step 4: Led by Sunderlal Bahuguna, Chandi Prasad Bhatt, and Gaura Devi.",
                    "Step 5: It was a forest conservation movement."
                ],
                "explanation": "The Chipko Movement (1973) was a non-violent forest conservation movement where villagers hugged trees to prevent them from being cut down by commercial loggers.",
                "indian_context": "Led by Gaura Devi and Chandi Prasad Bhatt, Chipko inspired the 1980 Forest Conservation Act. It was a precursor to India's modern environmental movement."
            },
            {
                "id": "for_05",
                "question": "In Tropical Thorn forests of Rajasthan, which tree is commonly found?",
                "options": ["Deodar", "Mahogany", "Babul (Kikar)", "Sal"],
                "correct": 2,
                "steps": [
                    "Step 1: Identify the climate of Rajasthan — hot and dry with <50 cm rainfall.",
                    "Step 2: Thorn forests have trees with thorns and deep roots to conserve water.",
                    "Step 3: Babul (Acacia nilotica, called Kikar) is the characteristic tree of thorn forests.",
                    "Step 4: Deodar → Montane, Mahogany → Evergreen, Sal → Deciduous.",
                    "Step 5: Answer = Babul (Kikar)."
                ],
                "explanation": "Babul (Acacia nilotica), also called Kikar, is the characteristic tree of Tropical Thorn forests. It has thorns to protect leaves from herbivores and deep roots to access groundwater.",
                "indian_context": "The Thar Desert (Rajasthan) is India's largest desert at ~200,000 sq km. Babul trees provide gum arabic, fodder, and fuelwood. The Bishnoi community of Rajasthan are traditional forest protectors."
            },
        ]

        # ── WATER ──
        bank["water"] = [
            {
                "id": "wat_01",
                "question": "Water exists in how many states of matter on Earth?",
                "options": ["One", "Two", "Three", "Four"],
                "correct": 2,
                "steps": [
                    "Step 1: The three states of matter for water are:",
                    "  • Solid: Ice (Himalayan glaciers, polar ice caps)",
                    "  • Liquid: Water (rivers, lakes, oceans)",
                    "  • Gas: Water vapour (invisible in the atmosphere)",
                    "Step 2: There is no fourth common state on Earth (plasma requires very high energy).",
                    "Step 3: Answer = Three."
                ],
                "explanation": "Water exists in three states: Solid (ice), Liquid (water), and Gas (water vapour). These cycle continuously through evaporation, condensation, and precipitation.",
                "indian_context": "The Himalayas hold about 10,000 glaciers that feed major rivers (Ganga, Indus, Brahmaputra). The Gangotri glacier alone feeds the Ganga. Climate change is melting these glaciers rapidly."
            },
            {
                "id": "wat_02",
                "question": "Which process changes water VAPOUR back into LIQUID water?",
                "options": ["Evaporation", "Condensation", "Sublimation", "Precipitation"],
                "correct": 1,
                "steps": [
                    "Step 1: Understand the water cycle processes:",
                    "  • Evaporation: Liquid → Gas (heating)",
                    "  • Condensation: Gas → Liquid (cooling)",
                    "  • Sublimation: Solid → Gas (direct, like dry ice)",
                    "  • Precipitation: Water falling from clouds (rain, snow, hail)",
                    "Step 2: Vapour → Liquid = Condensation.",
                    "Step 3: Examples: Dew on grass, water droplets on a cold glass.",
                    "Step 4: Answer = Condensation."
                ],
                "explanation": "Condensation is the process where water vapour (gas) cools and turns back into liquid water. It forms clouds, dew, and fog.",
                "indian_context": "During monsoon season (June–September), warm moist winds from the Arabian Sea and Bay of Bengal carry water vapour that condenses over India, bringing rainfall that sustains agriculture for ~60% of India's farmland."
            },
            {
                "id": "wat_03",
                "question": "How much of Earth's total water is freshwater (available for drinking/agriculture)?",
                "options": ["About 50%", "About 25%", "About 2.5%", "About 97%"],
                "correct": 2,
                "steps": [
                    "Step 1: Total water on Earth: ~1,386 million cubic km.",
                    "Step 2: Saltwater (oceans, seas): ~97.5% → NOT usable.",
                    "Step 3: Freshwater: ~2.5% of total.",
                    "Step 4: Of that 2.5%, about 70% is locked in glaciers and polar ice caps.",
                    "Step 5: Less than 1% of all Earth's water is available as accessible liquid freshwater.",
                    "Step 6: Answer = About 2.5%."
                ],
                "explanation": "Only about 2.5% of Earth's water is freshwater. Of this, about 70% is locked in glaciers and ice caps. Less than 1% is readily accessible for human use.",
                "indian_context": "India has 4% of the world's water resources but 17% of the world's population. Per-capita water availability has dropped from ~5,000 m³/year in 1950 to ~1,400 m³/year now — approaching 'water stress' levels."
            },
            {
                "id": "wat_04",
                "question": "In India, which state made rainwater harvesting MANDATORY for all buildings?",
                "options": ["Kerala", "Tamil Nadu", "Rajasthan", "Gujarat"],
                "correct": 1,
                "steps": [
                    "Step 1: Identify the pioneer state in India for mandatory rainwater harvesting.",
                    "Step 2: Tamil Nadu became the first state (2001, under CM J. Jayalalithaa) to make rooftop rainwater harvesting mandatory for all new buildings.",
                    "Step 3: Rajasthan has traditional Johads but no state-wide mandate at that time.",
                    "Step 4: Kerala and Gujarat have water conservation programmes but not state-wide mandates.",
                    "Step 5: Answer = Tamil Nadu."
                ],
                "explanation": "Tamil Nadu became the first Indian state (2001) to mandate rainwater harvesting for all new buildings, significantly improving groundwater levels in Chennai and other cities.",
                "indian_context": "Chennai (Tamil Nadu) transformed from water scarcity to relative water security through rainwater harvesting. Gujarat's 'Sujalam Sufalam' scheme and 'Mukhyamantri Mahashakti Yojana' have also promoted rainwater harvesting."
            },
        ]

        # ── AIR ──
        bank["air"] = [
            {
                "id": "air_01",
                "question": "What is the approximate percentage of OXYGEN in the Earth's atmosphere?",
                "options": ["78%", "21%", "0.04%", "50%"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the standard composition of dry air:",
                    "  • Nitrogen (N₂): ~78%",
                    "  • Oxygen (O₂): ~21%",
                    "  • Argon: ~0.93%",
                    "  • Carbon Dioxide (CO₂): ~0.04%",
                    "  • Other gases: trace amounts",
                    "Step 2: Oxygen is the second most abundant gas.",
                    "Step 3: Answer = 21%."
                ],
                "explanation": "Earth's atmosphere contains approximately 78% nitrogen, 21% oxygen, 0.93% argon, and 0.04% carbon dioxide (plus trace gases).",
                "indian_context": "Delhi's air quality often drops to hazardous levels in winter (AQI > 400), with PM2.5 levels 10–20 times above safe limits. The National Clean Air Programme (NCAP) targets 30% PM reduction by 2024."
            },
            {
                "id": "air_02",
                "question": "Which of the following is the MAIN cause of air pollution in Delhi-NCR during winter (October–December)?",
                "options": [
                    "Industrial emissions only",
                    "Burning of crop stubble (paddy residue) in Punjab & Haryana + vehicle exhaust + construction dust",
                    "Volcanic activity",
                    "Ocean spray"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Delhi's winter smog is a multi-source problem.",
                    "Step 2: Major contributors:",
                    "  • Stubble burning: Farmers in Punjab and Haryana burn paddy residue (Oct-Nov), sending smoke to Delhi.",
                    "  • Vehicle exhaust: Delhi has ~11 million vehicles.",
                    "  • Construction dust: from rapid urbanisation.",
                    "  • Industrial emissions: power plants, brick kilns.",
                    "Step 3: Stubble burning is the most visible and seasonal factor.",
                    "Step 4: Answer = Option B."
                ],
                "explanation": "Delhi's winter smog is caused by a combination of stubble burning (Punjab/Haryana), vehicle exhaust (~11 million vehicles), construction dust, and industrial emissions. Low wind speed in winter traps the pollutants.",
                "indian_context": "Punjab and Haryana produce ~35 million tonnes of paddy stubble annually. The 'Parali' (stubble) problem costs Delhi's economy billions in health costs annually. Solutions like the 'Pusa Decomposer' (IARI, Delhi) and 'Happy Seeder' machines are being promoted."
            },
            {
                "id": "air_03",
                "question": "Which gas do plants take in during PHOTOSYNTHESIS?",
                "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
                "correct": 2,
                "steps": [
                    "Step 1: Recall the photosynthesis equation:",
                    "   6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
                    "Step 2: Plants TAKE IN CO₂ and water; RELEASE oxygen.",
                    "Step 3: Chlorophyll in leaves traps sunlight energy to convert CO₂ and H₂O into glucose (food).",
                    "Step 4: Answer = Carbon Dioxide."
                ],
                "explanation": "Plants take in carbon dioxide (CO₂) during photosynthesis and release oxygen as a by-product. This is why plants are vital for maintaining the oxygen balance in the atmosphere.",
                "indian_context": "India's forest cover has increased to 24.56% of geographical area (2021) due to afforestation drives. The National Mission for a Green India aims to increase forest cover to 33%."
            },
        ]

        # ── NATURAL RESOURCES ──
        bank["resources"] = [
            {
                "id": "res_01",
                "question": "Which of the following is a RENEWABLE resource?",
                "options": ["Coal", "Petroleum", "Solar Energy", "Natural Gas"],
                "correct": 2,
                "steps": [
                    "Step 1: Define renewable: resources that replenish naturally within a human lifetime.",
                    "Step 2: Define non-renewable: resources that take millions of years to form and cannot be replenished.",
                    "Step 3: Coal, Petroleum, Natural Gas → fossil fuels → take millions of years to form → Non-renewable.",
                    "Step 4: Solar Energy → the Sun provides it continuously → Renewable.",
                    "Step 5: Answer = Solar Energy."
                ],
                "explanation": "Solar energy is renewable because the Sun will continue to radiate energy for billions of years. Coal, petroleum, and natural gas are non-renewable fossil fuels.",
                "indian_context": "India's installed solar capacity crossed 70 GW in 2023. The Bhadla Solar Park (Rajasthan) is the world's largest solar park at 2,250 MW. India aims for 500 GW non-fossil capacity by 2030."
            },
            {
                "id": "res_02",
                "question": "Which state in India has the HIGHEST coal reserves?",
                "options": ["Maharashtra", "Jharkhand", "West Bengal", "Odisha"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall India's coal reserves by state.",
                    "Step 2: Jharkhand has the largest coal reserves (~26% of India's total).",
                    "Step 3: Major coal fields: Jharia (Jharkhand), Raniganj (West Bengal), Talcher (Odisha).",
                    "Step 4: Odisha has the highest production but Jharkhand has the highest reserves.",
                    "Step 5: Answer = Jharkhand."
                ],
                "explanation": "Jharkhand holds the largest coal reserves in India (~26%), followed by Odisha. The Damodar Valley (Jharkhand–West Bengal) is called India's 'Ruhr Valley' after Germany's industrial region.",
                "indian_context": "Coal India Limited (CIL), headquartered in Kolkata, is the world's largest coal-producing company. India is the second-largest coal producer after China. Coal provides ~44% of India's primary energy."
            },
            {
                "id": "res_03",
                "question": "The '3Rs' principle in waste management stands for:",
                "options": [
                    "Reduce, Reuse, Recycle",
                    "Read, Remember, Recite",
                    "Run, Rest, Relax",
                    "Reduce, Repair, Rebuild"
                ],
                "correct": 0,
                "steps": [
                    "Step 1: The 3Rs principle is the cornerstone of waste management.",
                    "Step 2: Reduce = minimise waste generation (use less).",
                    "Step 3: Reuse = use items multiple times (carry a cloth bag, use glass bottles).",
                    "Step 4: Recycle = convert waste into new products (paper recycling, plastic recycling).",
                    "Step 5: Answer = Reduce, Reuse, Recycle."
                ],
                "explanation": "The 3Rs of waste management are: Reduce (use less), Reuse (use again), and Recycle (convert into new products). They form the waste hierarchy.",
                "indian_context": "India's Solid Waste Management Rules (2016) mandate segregation at source. Many cities now use the 3Rs approach. Indore has been ranked India's cleanest city multiple times (Swachh Survekshan)."
            },
        ]

        # ── WEATHER & CLIMATE ──
        bank["weather"] = [
            {
                "id": "wea_01",
                "question": "The average weather pattern of a place over many years is called:",
                "options": ["Weather", "Climate", "Temperature", "Humidity"],
                "correct": 1,
                "steps": [
                    "Step 1: Weather = day-to-day atmospheric conditions (changes daily).",
                    "Step 2: Climate = average weather pattern over ~30 years.",
                    "Step 3: Temperature and humidity are ELEMENTS of weather, not the overall pattern.",
                    "Step 4: Answer = Climate."
                ],
                "explanation": "Climate is the long-term average of weather patterns (typically 30+ years). Weather refers to short-term conditions (today, this week).",
                "indian_context": "India has six major climate types per the Köppen system — tropical wet, tropical dry, subtropical humid, montane, etc. The India Meteorological Department (IMD, est. 1875) monitors weather and issues monsoon forecasts."
            },
            {
                "id": "wea_02",
                "question": "Which season in India lasts from March to approximately May?",
                "options": ["Winter", "Summer / Pre-monsoon", "Monsoon", "Post-monsoon"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the four seasons in India (IMD classification):",
                    "  • Winter: January–February",
                    "  • Summer / Pre-monsoon: March–May",
                    "  • Monsoon / Southwest: June–September",
                    "  • Post-monsoon / Autumn: October–December",
                    "Step 2: March–May = Summer / Pre-monsoon.",
                    "Step 3: Temperatures reach 40–45°C in North India during this season.",
                    "Step 4: Answer = Summer / Pre-monsoon."
                ],
                "explanation": "India's Summer/Pre-monsoon season is March–May. Temperatures can reach 45–48°C in the Thar Desert (Rajasthan) and 40°C+ in the Indo-Gangetic plains during this season.",
                "indian_context": "Rajasthan's Churu recorded 50.8°C in 2019 — India's highest verified temperature. The Loo (hot, dry wind) blows across North India during summer, causing heatstroke. Heatwave warnings are issued by the IMD."
            },
            {
                "id": "wea_03",
                "question": "The monsoon winds that bring rainfall to India originate from which ocean?",
                "options": ["Atlantic Ocean", "Indian Ocean (south-west monsoon)", "Arctic Ocean", "Pacific Ocean"],
                "correct": 1,
                "steps": [
                    "Step 1: South-west monsoon (June–September) brings ~75% of India's annual rainfall.",
                    "Step 2: Moisture-laden winds blow from the Indian Ocean (south-west direction).",
                    "Step 3: The monsoon 'bursts' over Kerala around June 1 (meteorological date).",
                    "Step 4: The Himalayas block and deflect these winds, causing heavy rainfall.",
                    "Step 5: Answer = Indian Ocean (south-west monsoon)."
                ],
                "explanation": "The South-west monsoon winds originate over the Indian Ocean, pick up moisture, and bring heavy rainfall to India from June to September. The Western Ghats and Himalayas play key roles in causing rainfall.",
                "indian_context": "Mawsynram (Meghalaya) is the wettest place on Earth at ~11,872 mm annual rainfall. Cherrapunji is second. The monsoon determines the fate of ~60% of India's farmers (Kharif crops). A bad monsoon can push millions into food insecurity."
            },
        ]

        # ── ADAPTATION ──
        bank["adaptation"] = [
            {
                "id": "ada_01",
                "question": "Why do polar bears have a thick layer of fat (blubber) under their skin?",
                "options": [
                    "To help them swim faster",
                    "To insulate against extreme cold",
                    "To store food for winter",
                    "To attract mates"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Identify the habitat of the polar bear — Arctic region, temperatures as low as -40°C.",
                    "Step 2: Blubber is a thick layer of fat (~10 cm thick) under the skin.",
                    "Step 3: Fat is a poor conductor of heat — it traps body warmth and prevents heat loss.",
                    "Step 4: It also serves as an energy reserve during fasting periods.",
                    "Step 5: Primary function = insulation against cold."
                ],
                "explanation": "Polar bears have ~10 cm of blubber (fat) that acts as insulation, preventing heat loss in -40°C temperatures. It also provides buoyancy for swimming and energy during periods of fasting.",
                "indian_context": "India's armed forces deployed in Siachen Glacier (-50°C) use similar layering principles — multiple layers of wool/synthetic insulation, similar to how polar bears use blubber. The Siachen Glacier is the world's highest battlefield."
            },
            {
                "id": "ada_02",
                "question": "A camel's hump stores:",
                "options": ["Water", "Fat", "Food", "Bones"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the function of a camel's hump.",
                    "Step 2: The hump stores FAT (adipose tissue), not water.",
                    "Step 3: When food is scarce, the fat is metabolised, producing metabolic WATER as a byproduct.",
                    "Step 4: A full hump can weigh up to 35 kg and can nourish the camel for weeks.",
                    "Step 5: Answer = Fat."
                ],
                "explanation": "A camel's hump stores FAT, not water. When metabolised, this fat produces water (1 gram of fat → ~1.07 ml water). Camels can lose up to 25% body weight through dehydration and still survive.",
                "indian_context": "The Thar Desert (Rajasthan) is home to India's dromedary camels (single-humped). The Bactrian camel (two-humped) is found in Ladakh. Rajasthan has the highest camel population in India. The annual Pushkar Camel Fair is a famous cultural event."
            },
            {
                "id": "ada_03",
                "question": "Red-eyed frogs of the Western Ghats have sticky pads on their feet to:",
                "options": [
                    "Swim in water",
                    "Climb trees",
                    "Dig burrows",
                    "Fly short distances"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Identify the habitat — Western Ghats is a tropical rainforest with dense trees.",
                    "Step 2: Sticky pads on the feet (toe discs) increase surface area and create suction on smooth surfaces.",
                    "Step 3: This adaptation helps frogs climb and cling to tree branches.",
                    "Step 4: Other adaptations: nocturnal activity (avoid daytime heat), bright red eyes (startle predators), moist skin for cutaneous respiration.",
                    "Step 5: Answer = Climb trees."
                ],
                "explanation": "Red-eyed tree frogs have enlarged toe pads with sticky mucus that acts like suction cups, enabling them to climb smooth leaves and branches in the rainforest canopy.",
                "indian_context": "The Western Ghats are home to the purple frog (Nasikabatrachus sahyadrensis), which lives underground for 51 weeks of the year and surfaces only during monsoon to breed. India has over 400 frog species, many found nowhere else."
            },
        ]

        # ── SOIL ──
        bank["soil"] = [
            {
                "id": "sol_01",
                "question": "Which soil type is MOST suitable for growing cotton in India?",
                "options": ["Alluvial", "Black (Regur)", "Red", "Laterite"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the properties of each soil type:",
                    "  • Alluvial: Fine, porous, very fertile → rice, wheat",
                    "  • Black (Regur): Clayey, retains moisture well, rich in lime and iron → cotton (called 'black cotton soil')",
                    "  • Red: Sandy, porous, low fertility → millets, pulses",
                    "  • Laterite: Rich in iron oxide, hard when dry → rubber, cashew",
                    "Step 2: Cotton requires a soil that retains moisture but drains well.",
                    "Step 3: Black soil (Regur) is ideal — it holds moisture during dry periods and cracks when dry (helping aeration).",
                    "Step 4: Answer = Black (Regur) soil."
                ],
                "explanation": "Black soil (Regur) is ideal for cotton cultivation because it is clayey and retains moisture well — crucial for cotton which needs consistent water. It also cracks in dry conditions, helping aeration of the root system.",
                "indian_context": "Maharashtra is India's largest cotton-producing state (~8 million bales/year). Black soil covers much of the Deccan Plateau. India is the world's largest cotton producer. The Cotton Corporation of India (CCI) regulates cotton trade."
            },
            {
                "id": "sol_02",
                "question": "Laterite soil is rich in which mineral that gives it a reddish colour?",
                "options": ["Calcium", "Iron oxide", "Nitrogen", "Potassium"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the name 'Laterite' comes from Latin 'later' = brick.",
                    "Step 2: Laterite soil hardens like brick when exposed to air and sun.",
                    "Step 3: The reddish colour comes from iron oxide (rust).",
                    "Step 4: Laterite forms in hot, wet tropical areas through intense weathering.",
                    "Step 5: Answer = Iron oxide."
                ],
                "explanation": "Laterite soil is rich in iron oxide, which gives it a characteristic reddish-brown colour. It also contains aluminium oxide and is poor in nitrogen and organic matter.",
                "indian_context": "Kerala, Karnataka, Odisha, and parts of NE India have laterite soil. The word 'laterite' comes from Latin 'later' (brick) because it hardens like brick when exposed. Historically, laterite was used as building material in Kerala temples."
            },
            {
                "id": "sol_03",
                "question": "Soil erosion in the Himalayan region is mainly caused by:",
                "options": [
                    "Only wind",
                    "Heavy rainfall, deforestation, and steep slopes",
                    "Desert conditions only",
                    "Only farming practices"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Identify the Himalayan region's characteristics.",
                    "Step 2: Heavy monsoon rainfall + steep mountain slopes → rapid surface runoff.",
                    "Step 3: Deforestation for roads, buildings, agriculture removes tree roots that bind soil.",
                    "Step 4: Wind erosion is less significant here (it dominates in arid areas).",
                    "Step 5: Answer = Heavy rainfall, deforestation, and steep slopes."
                ],
                "explanation": "Himalayan soil erosion is caused by heavy monsoon rainfall, steep slopes (gravity-assisted runoff), and deforestation that removes root systems holding soil together.",
                "indian_context": "The 2013 Kedarnath floods were partly caused by soil erosion and landslides after heavy rain on deforested slopes. The Chipko Movement in Uttarakhand was partly a response to prevent soil erosion through forest protection."
            },
        ]

        # ── WATER CONSERVATION ──
        bank["water_conservation"] = [
            {
                "id": "wc_01",
                "question": "Which method of water conservation uses earthen check dams (Johads) in Rajasthan?",
                "options": ["Drip irrigation", "Rainwater harvesting", "Watershed management", "Khadin system"],
                "correct": 3,
                "steps": [
                    "Step 1: Define each option:",
                    "  • Drip irrigation: delivers water drop-by-drop to plant roots.",
                    "  • Rainwater harvesting: collecting rain in tanks.",
                    "  • Watershed management: managing an entire drainage basin.",
                    "  • Khadin system: traditional earthen check dams (Johads) built across streams to store rainwater.",
                    "Step 2: The Tarun Bharat Sangh (led by Rajendra Singh, 'Waterman of India') revived Johads in Alwar district, Rajasthan.",
                    "Step 3: Answer = Khadin system."
                ],
                "explanation": "Khadin is a traditional water harvesting system in Rajasthan using earthen check dams (Johads) that store rainwater, recharge groundwater, and provide irrigation. Rajendra Singh's work in Alwar revived this system.",
                "indian_context": "Rajendra Singh ('Jal Purush') revived Johads in Alwar, Rajasthan — creating ~8,500 Johads that recharged groundwater and brought 5 rivers back to life. He won the Ramon Magsaysay Award (2001) and Stockholm Water Prize (2015)."
            },
            {
                "id": "wc_02",
                "question": "The 'Ralegan Siddhi' model of water conservation was pioneered by:",
                "options": [
                    "Rajendra Singh",
                    "Anna Hazare",
                    "Medha Patkar",
                    "Sunderlal Bahuguna"
                ],
                "correct": 1,
                "steps": [
                    "Step 1: Ralegan Siddhi is a village in Ahmednagar district, Maharashtra.",
                    "Step 2: Anna Hazare transformed this drought-prone village through watershed development.",
                    "Step 3: He built check dams, trenches, and implemented community-led water management.",
                    "Step 4: Rajendra Singh → Alwar (Rajasthan), Medha Patkar → Narmada Bachao, Bahuguna → Chipko.",
                    "Step 5: Answer = Anna Hazare."
                ],
                "explanation": "Anna Hazare transformed Ralegan Siddhi from a drought-prone village to a model of water conservation through community-built check dams and watershed management in the 1970s–1990s.",
                "indian_context": "Ralegan Siddhi (Ahmednagar, Maharashtra) went from severe drought to a village with sustainable irrigation, afforestation, and grain banks through Anna Hazare's leadership. It is now studied as a model for rural development."
            },
        ]

        # ── WASTE MANAGEMENT ──
        bank["waste"] = [
            {
                "id": "was_01",
                "question": "Which of the following is a BIO-DEGRADABLE waste?",
                "options": ["Plastic bag", "Glass bottle", "Fruit peels", "Aluminium can"],
                "correct": 2,
                "steps": [
                    "Step 1: Define biodegradable: can be broken down by living organisms (bacteria, fungi).",
                    "Step 2: Define non-biodegradable: cannot be broken down easily; persists in environment.",
                    "Step 3: Fruit peels → bacteria/fungi break them down into compost (weeks to months).",
                    "Step 4: Plastic (500+ years), Glass (1 million+ years), Aluminium (200+ years) → Non-biodegradable.",
                    "Step 5: Answer = Fruit peels."
                ],
                "explanation": "Fruit peels are biodegradable — microorganisms break them down into organic matter (compost) within weeks to months. Plastic, glass, and aluminium persist for hundreds to thousands of years.",
                "indian_context": "India generates ~62 million tonnes of municipal solid waste annually. Only ~20% is processed. Cities like Indore and Mysuru have achieved >90% waste segregation and processing through Swachh Bharat initiatives."
            },
            {
                "id": "was_02",
                "question": "Vermicomposting uses which organism to decompose organic waste?",
                "options": ["Bacteria", "Earthworms", "Fungi", "Algae"],
                "correct": 1,
                "steps": [
                    "Step 1: Vermicomposting = using worms to compost organic waste.",
                    "Step 2: Earthworms (e.g., Eisenia foetida — red wiggler) eat organic matter.",
                    "Step 3: Their digestive process converts waste into nutrient-rich vermicompost.",
                    "Step 4: Bacteria and fungi also help but earthworms are the primary agent.",
                    "Step 5: Answer = Earthworms."
                ],
                "explanation": "Vermicomposting uses earthworms (especially Eisenia foetida) to break down organic waste into nutrient-rich fertiliser called vermicast.",
                "indian_context": "Vermicomposting is promoted by Khadi and Village Industries Commission (KVIC) and many state agricultural departments. It provides organic fertiliser for kitchen gardens and small farms."
            },
        ]

        # ── BIOGAS ──
        bank["biogas"] = [
            {
                "id": "bio_01",
                "question": "What is the PRIMARY raw material used in an Indian domestic biogas plant (Gobar Gas plant)?",
                "options": ["Rice husk", "Cow dung (Gobar)", "Plastic waste", "Coal"],
                "correct": 1,
                "steps": [
                    "Step 1: Recall the components of a biogas plant.",
                    "Step 2: Cow dung (gobar) mixed with water is the standard feedstock in rural Indian biogas plants.",
                    "Step 3: The dung undergoes anaerobic digestion by methanogenic bacteria.",
                    "Step 4: Output: Biogas (~55-65% methane) + organic slurry (fertiliser).",
                    "Step 5: Answer = Cow dung (Gobar)."
                ],
                "explanation": "Cow dung (gobar) is the primary feedstock for rural biogas plants in India. Mixed with water and fed into an airtight digester, it produces biogas (methane) through anaerobic digestion by methanogenic bacteria.",
                "indian_context": "India's National Biogas and Manure Management Programme (NBMMP) has installed over 4.87 million biogas plants. Biogas provides clean cooking fuel, reduces indoor air pollution (kills 1 million Indians/year), and produces organic fertiliser."
            },
            {
                "id": "bio_02",
                "question": "The main energy-rich gas produced in a biogas plant is:",
                "options": ["Carbon Dioxide", "Methane (CH₄)", "Oxygen", "Nitrogen"],
                "correct": 1,
                "steps": [
                    "Step 1: Biogas composition: ~55-65% methane (CH₄), ~30-40% CO₂, small amounts of H₂S, H₂.",
                    "Step 2: Methane is the combustible, energy-rich component.",
                    "Step 3: CO₂ is non-combustible (doesn't burn).",
                    "Step 4: Methane is the same gas in natural gas (fossil).",
                    "Step 5: Answer = Methane (CH₄)."
                ],
                "explanation": "Methane (CH₄) makes up 55-65% of biogas and is the energy-rich, combustible component. It is the same gas found in natural gas, making biogas a renewable alternative.",
                "indian_context": "India's biogas programme supports rural energy security. Each biogas plant saves ~4 tonnes of firewood/year, reduces deforestation, and reduces CO₂ emissions by ~8 tonnes/year. The slurry (byproduct) replaces chemical fertilisers."
            },
        ]

        return bank

    # ─────────────────────────────────────────────
    #   Question-sequence generator